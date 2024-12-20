import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  code: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPasswordEmail = ({
  code = "000000"
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your reset code is {code}</Preview>
      <Tailwind
        config={{
          safelist: "",
          separator: "-",
          corePlugins: "",
          experimental: "",
          theme: {
            extend: {
              colors: {
                brand: "#18181b",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src="https://prosaccounting.owenprosser.co.uk/pros-accounting-logo.png"
            width="241.9"
            height="30"
            alt="ProsAccounting"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-10">
              Your reset code is {code}
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  A request has been sent to reset your password. Enter the code above in ProsAccounting to reset your password.
                </Text>

                <Text className="text-base">If you didn't make this request, you can ignore this email. Do not share this code. This code expires after 1 hour.</Text>
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Text className="text-center text-gray-400 mb-45">
              &copy; Owen Prosser {new Date().getFullYear()}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
