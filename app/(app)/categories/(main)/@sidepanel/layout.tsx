import CloseButton from "./close-button";

const SidepanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="w-96 border bg-muted/50 rounded-2xl p-3 sticky top-4">
        <div className="flex justify-end -mt-1 -mr-1">
          <CloseButton />
        </div>

        {children}
      </div>
    </div>
  );
};

export default SidepanelLayout;
