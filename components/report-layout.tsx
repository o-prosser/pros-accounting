import { Document, Page, View, Text, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import PdfLogo from "@/components/pdf-logo";
import React from "react";

const GeneralSansRegular =
  "https://pros-accounting.vercel.app/GeneralSans-Regular.ttf";
const GeneralSansMedium =
  "https://pros-accounting.vercel.app/GeneralSans-Medium.ttf";
const GeneralSansBold =
  "https://pros-accounting.vercel.app/GeneralSans-Bold.ttf";
const Mono = "https://owenprosser.co.uk/fonts/PoeVeticaMonospace-6B7Y.ttf";

Font.register({
  family: "GeneralSansMedium",
  src: GeneralSansMedium,
});

Font.register({
  family: "GeneralSansBold",
  src: GeneralSansBold,
});

Font.register({
  family: "General Sans",
  fonts: [
    {
      src: GeneralSansRegular,
      fontWeight: "normal",
    },
    {
      src: GeneralSansMedium,
      fontWeight: "medium",
    },
    {
      src: "https://pros-accounting.vercel.app/GeneralSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Mono",
  fontWeight: 400,
  src: Mono,
});

export const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["General Sans"],
      mono: ["Mono"],
    },
    colors: {
      gray: "#a3a3a3",
    },
  },
});

export const ReportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Document>
      <Page size="A4" style={tw("font-sans text-[12pt] p-[2cm]")}>
        {children}

        <View
          fixed
          style={tw(
            "absolute w-screen left-0 bottom-0 right-0 p-[2cm] pt-0 flex flex-row justify-between",
          )}
        >
          <PdfLogo />
          <Text
            style={tw("text-[10pt]")}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <Text style={tw("text-[20pt] font-sans")}>{children}</Text>;
};

export const SubTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text style={{ fontFamily: "General Sans", ...tw("text-[16pt]") }}>
      {children}
    </Text>
  );
};
