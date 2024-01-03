import { io, Socket } from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { roleState } from '../store/atom/auth';

interface IMessage {
  inputMessage: string;
  isMine: boolean;
}

const socket: Socket = io('http://15.165.165.45:9092', {
  transports: ['websocket'],
  path: '/socket.io',
});

export default function ChatContainer() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const roles = useRecoilValue(roleState);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage = inputRef.current?.value;
    if (!newMessage) return;

    const isDuplicate =
      messages.length > 0 &&
      messages[messages.length - 1].inputMessage === newMessage;

    if (!isDuplicate) {
      setMessages(prevMessages => [
        ...prevMessages,
        { inputMessage: newMessage || '', isMine: true },
      ]);

      socket.emit('send_message', {
        inputMessage: newMessage,
        isMine: true,
      });

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } else {
      alert('연속 중복된 메시지입니다.');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    socket.on('connect', () => console.log('서버에 연결되었습니다!'));

    const handleReceiveMessage = (data: IMessage) => {
      const receivedMessage = data.inputMessage;

      if (receivedMessage !== undefined) {
        const isDuplicate =
          messages.length > 0 &&
          messages[messages.length - 1].inputMessage === receivedMessage;

        if (!isDuplicate) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              inputMessage: receivedMessage,
              isMine: false,
              userType: 'seller',
            },
          ]);
        }
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [messages]);

  return (
    <Wrapper>
      <ShopProfileContainer>
        <MainProfileImage src="https://www.interview365.com/news/photo/202205/101973_129439_4443.jpg" />
        <ShopName>친환경스토어</ShopName>
        <Text>채팅 가능 시간: 평일 08:00 ~ 22:00</Text>
      </ShopProfileContainer>
      {roles[0] === '구매자' ? (
        <MessageContainer>
          <UserProfile>
            <ProfileImage
              src="https://www.interview365.com/news/photo/202205/101973_129439_4443.jpg"
              alt="Profile"
            />
          </UserProfile>
          <ChatMessage>
            안녕하세요. 친환경스토어 입니다. <br />
            궁금한 내용이 있으시면 메시지를 남겨주세요.
          </ChatMessage>
        </MessageContainer>
      ) : null}
      {messages.map((message, index) => (
        <MessageContainer key={index}>
          {message.isMine ? (
            <>
              <MyMessage>{message.inputMessage}</MyMessage>
            </>
          ) : (
            <>
              <UserProfile>
                {roles[0] === '구매자' ? (
                  <ProfileImage
                    // src="URL_TO_BUYER_PROFILE_IMAGE"
                    src="https://www.interview365.com/news/photo/202205/101973_129439_4443.jpg"
                    alt="Profile"
                  />
                ) : (
                  <Avatar src="/broken-image.jpg" />
                )}
              </UserProfile>
              <ChatMessageContainer>
                <ChatMessage>{message.inputMessage}</ChatMessage>
              </ChatMessageContainer>
            </>
          )}
        </MessageContainer>
      ))}
      <InputContainer>
        <Form onSubmit={sendMessage}>
          <InputMessage
            type="text"
            placeholder="메시지를 입력하세요"
            ref={inputRef}
          />
          <SendMessageButton type="submit">전송</SendMessageButton>
        </Form>
      </InputContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  margin: 20px auto;
`;

const ShopProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const MainProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
  // background-color: #000;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #000;
`;

const ShopName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Text = styled.p`
  margin-bottom: 50px;
`;

const ChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatMessage = styled.div`
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
  align-self: flex-start;
  margin-right: auto;
`;

const MyMessage = styled.div`
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
  align-self: flex-end;
  margin-left: auto;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: flex-end;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex: 1;
`;

const InputMessage = styled.input`
  flex: 1;
  padding: 5px;
  width: 90%;
`;

const SendMessageButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
