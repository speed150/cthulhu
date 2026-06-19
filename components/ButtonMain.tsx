import Link from "next/link";

export function ButtonMain({
  buttonText,
  mainColor,
  href,
}: {
  buttonText: string;
  mainColor?: boolean;
  href: string;
}) {
  return (
    <>
      {
        <Link
          className={
            mainColor ? "button button-main" : "button button-secondary"
          }
          href={href}
        >
          <div key={buttonText}>{buttonText}</div>
        </Link>
      }
    </>
  );
}
