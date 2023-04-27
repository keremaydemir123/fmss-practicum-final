interface ITextBox {
  title: string;
  value: string | number | undefined;
}

function DetailBox({ title, value }: ITextBox) {
  return (
    <div className="flex flex-col w-full px-4 py-3 rounded-lg bg-base-200/80 shadow-md">
      <strong className="italic">{title}</strong>
      <span className="text-base text-base-content/60">{value}</span>
    </div>
  );
}

export default DetailBox;
