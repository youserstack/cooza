import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons/lib";

interface Props {
  provider: string;
  label: string;
  Icon: IconType;
  iconClassName?: string;
}

export default function SigninButton({ provider, label, Icon, iconClassName }: Props) {
  const action = async () => {
    "use server";
    await signIn(provider, { redirectTo: "/" });
  };

  return (
    <form action={action}>
      <Button type="submit" variant="outline" className="w-full cursor-pointer">
        <Icon className={iconClassName} />
        <span>{label}</span>
      </Button>
    </form>
  );
}
