export function WelcomeHeader() {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold">
        Welcome Back, *NAME* ⭐
      </h2>
      <p className="text-muted-foreground">
        Level *Level* — *TITLE*
      </p>
    </div>
  );
}