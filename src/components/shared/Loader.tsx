// src/components/shared/Loader.tsx
import "./Loader.css";

const Loader = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="loader" style={{ width: size, height: size }}>
      <div className="loader-ring" />
    </div>
  );
};

export default Loader;
