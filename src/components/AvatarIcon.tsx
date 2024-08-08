import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  imageUrl?: string;
  name?: string;
};

const AvatarIcon = ({ imageUrl, name }: Props) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={imageUrl} alt="user" />
      <AvatarFallback>{name?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarIcon;
