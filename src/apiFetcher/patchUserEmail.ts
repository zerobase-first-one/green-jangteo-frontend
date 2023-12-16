import axios from "axios";

export const changeEmail = async (userId, password, email, navigate) => {
  const data = { password, email };

  try {
    const response = await axios.patch(`/users/${userId}/email`, data);

    if (response.status === 204) {
      alert("이메일이 성공적으로 변경되었습니다.");
      navigate("/users/login");
    }
  } catch (error) {
    console.error("이메일 변경 시 에러가 발생했습니다:", error);
  }
};
