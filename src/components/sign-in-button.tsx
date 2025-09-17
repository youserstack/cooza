import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons/lib";

export default function SignInButton({
  provider,
  label,
  Icon,
  iconClassName,
  callbackUrl,
}: {
  provider: string;
  label: string;
  Icon: IconType;
  iconClassName?: string;
  callbackUrl: string;
}) {
  const action = async () => {
    "use server";
    await signIn(provider, { redirectTo: callbackUrl });
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
