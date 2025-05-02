import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import SigninButton from "@/components/custom/signin-button";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>사용할 계정을 선택하세요</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <Oauth />
          <Divider />
          <GeneralAuth />
          <SignupNotice />
        </CardContent>
      </Card>

      <AgreementNotice />
    </div>
  );
}

function Oauth() {
  return (
    <div className="Oauth flex flex-col gap-4">
      <SigninButton provider="google" label="구글로 로그인" Icon={FcGoogle} />
      <SigninButton
        provider="naver"
        label="네이버로 로그인"
        Icon={SiNaver}
        iconClassName="!h-3 text-[#03C75A]"
      />
    </div>
  );
}

function Divider() {
  return (
    <div className="Divider relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
      <span className="relative z-10 bg-background px-2 text-muted-foreground">
        또는 이메일로 계속하기
      </span>
    </div>
  );
}

function GeneralAuth() {
  return (
    <form className="GeneralAuth grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="example@example.com" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">비밀번호</Label>
          <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  );
}

function SignupNotice() {
  return (
    <div className="text-center text-sm space-x-4">
      <span>계정이 없으신가요?</span>
      <a href="#" className="underline underline-offset-4">
        회원가입
      </a>
    </div>
  );
}

function AgreementNotice() {
  return (
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary">
      <span>계속 진행하면 </span>
      <a href="#">이용 약관</a>
      <span> 및 </span>
      <a href="#">개인정보 처리방침</a>
      <span> 에 동의하는 것으로 간주됩니다.</span>
    </div>
  );
}
