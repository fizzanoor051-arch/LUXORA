// Re-mounted on every navigation, which replays the CSS entrance animation.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
