import styled from "styled-components";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Wrapper = styled.div`
   
   // height: calc(100% - 100px);
   height: 100%
   box-sizing: border-box;
`;
const Input = styled.input`
   width: 100%;
   height: 60px;
   font-size: 18px;
   border: none;  
   &:focus {
      outline: none;
   }
`;

const Search = () => {
   return (
      <>
         <Header />
         <Wrapper>
            <Input />
         </Wrapper>
         <NavBar />
      </>
   )
}

export default Search