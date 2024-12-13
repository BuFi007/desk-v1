import { Avatar, AvatarImage } from "@bu/ui/avatar";

type Props = {
  src: string | null;
  alt: string;
  size?: number;
};

export function BankLogo({ src, alt, size = 34 }: Props) {
  return (
    <Avatar style={{ width: size, height: size }}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarImage src="https://cdn-engine.bu.finance/default.jpg" alt={alt} />
    </Avatar>
  );
}
