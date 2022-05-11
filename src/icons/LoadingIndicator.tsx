export default function LoadingIndicator() {
  return (
    <div className="animate-[rotate_1.4s_linear_infinite]">
      <svg className="[stroke-dasharray:208] origin-[50%_50%] animate-[dash_1.4s_ease-in-out_infinite]" viewBox="0 0 72 72">
        <circle className="" cx="36" cy="36" r="33" stroke="black" strokeWidth="3" fill="none"/>
      </svg>
    </div>
  );
}