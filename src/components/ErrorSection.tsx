interface IErrorSection {
  status: string;
  error: string;
}

function ErrorSection({ status, error }: IErrorSection) {
  return (
    <section>
      <h1 className="heading !text-error text-center text-shadow">{status}</h1>
      <p className="heading text-center !text-3xl">{error}</p>
    </section>
  );
}

export default ErrorSection;
