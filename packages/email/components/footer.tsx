import { getEmailUrl } from "@bu/utils/envs";
import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { TripleColumn } from "responsive-react-email";

const baseUrl = getEmailUrl();

export function Footer() {
  return (
    <Section className="w-full">
      <Hr />

      <br />

      <Text className="text-[21px] font-regular">
        Run your business smarter.
      </Text>

      <br />

      <Row>
        <Link href="https://desk.bu.finance/FZwOHud">
          <Img
            src={`${baseUrl}/email/logo-footer.png`}
            width="100"
            alt="Bu"
            className="block"
          />
        </Link>
      </Row>
    </Section>
  );
}
