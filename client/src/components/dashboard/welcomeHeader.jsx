export function WelcomeHeader({ email, level, title }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold">
        Welcome Back, {email} ⭐
      </h2>
      <p className="text-muted-foreground">
        Level {level} - {title}
      </p>
    </div>
  );
}