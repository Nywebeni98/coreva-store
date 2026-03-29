import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignIn() {
  const handleGoogleSignIn = () => {
    // In a real app, this would redirect to Google OAuth
    // For now, we'll show an alert
    alert("Google Sign-In would be implemented here with OAuth 2.0");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex items-center h-20">
            <Link href="/">
              <img
                src="/assets/logo.png"
                alt="Coreva Store"
                className="h-16 md:h-20 w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center space-y-2 pb-2">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to your account to continue shopping
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium gap-3"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Secure sign-in
                </span>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-secondary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-secondary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                New to Coreva Store?{" "}
                <Link href="/shop" className="text-secondary font-medium hover:underline">
                  Start shopping
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Coreva Online Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
