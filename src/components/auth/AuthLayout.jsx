import logoImg from "../../assets/img/download.png";
import downloadImg from "../../assets/img/loginImage.7f43249d.png";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="container-fluid py-3 px-5">
      <div className="row mb-2">
        <div className="col-12 d-flex justify-content-end">
          <img
            src={logoImg}
            alt=""
            style={{ width: "100px", height: "25px" }}
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div
          className="col-12 border-2 border rounded-3 p-4"
          style={{ maxWidth: "800px", height: "auto", margin: "0 auto" }}
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <img className="img-fluid" src={downloadImg} alt="" />
            </div>

            <div className="col-6">
              <h5
                className="text-center mb-4"
                style={{ fontFamily: "Vazir-Bold" }}
              >
                {title}
              </h5>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
