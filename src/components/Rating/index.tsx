import Rating from "@mui/material/Rating";

const RatingComponent = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <Rating
      value={value}
      readOnly
      precision={0.5}
      className={className}
      size="small"
    />
  );
};

export default RatingComponent;
