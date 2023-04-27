import { BarLoader } from 'react-spinners';

function Loading() {
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--p');
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center z-50">
      <span className="text-primary">Loading...</span>
      <BarLoader color={`hsl(${primaryColor})`} />
    </div>
  );
}

export default Loading;
