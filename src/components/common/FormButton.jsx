const FormButton = ({ label, isLoading, ...rest }) => {
  return (
    <button
      className="btn btn-primary w-100 font-Vazir-Bold"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" />
          لطفاً صبر کنید...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default FormButton;
