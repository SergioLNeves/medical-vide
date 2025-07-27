export const Loading = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      children={
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-4 border-b-4" />
      }
    />
  );
};

export default Loading;
