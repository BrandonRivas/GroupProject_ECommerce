
import styled from "styled-components";


const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Wrapper>
        <Img src="watch.jpg" alt="a statue of a man selling watches" />
        <h2>Chroneos</h2>
        <P>
          Chroneos is a premier watch shop that offers a diverse collection of
          high-quality timepieces. Our selection includes classic and elegant
          styles, as well as modern and sporty watches. Each timepiece is
          carefully curated for its exceptional craftsmanship, reliability, and
          style. At Chroneos, we believe that a watch is more than just a
          timekeeping device. It is a statement of individuality and a
          reflection of personal taste. We offer a personalized shopping
          experience, where our knowledgeable staff helps you find the perfect
          watch that suits your unique needs and preferences. We also provide
          expert repair and maintenance services to ensure your timepiece
          functions at its best. Discover the world of watches with Chroneos.
        </P>
        <H2>Contact Us</H2>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <Textarea id="message" name="message" required></Textarea>
            <InputSubmit type="submit" value="Submit" />
          </Form>
        </FormContainer>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  height: 300px;
  width: 300px;
  object-fit: cover;
  border-radius: 50%;
`;

const H2 = styled.h2`
  margin-bottom: 0;
`;

const P = styled.div`
  width: 40em;
  line-height: 1.5;
  text-align: center;
`;
const FormContainer = styled.div`
  width: 20em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  height: 7em;
  resize: none;
`;

const InputSubmit = styled.input`
  margin-top: 1em;
`;

export default About;
