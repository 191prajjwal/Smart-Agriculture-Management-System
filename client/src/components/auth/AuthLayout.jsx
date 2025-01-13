import img from "../../assets/img6.jpg"

const AuthLayout = ({ children }) => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{
            backgroundImage: `url(${img})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="w-full max-w-md z-10">
          {children}
        </div>
      </div>
    );
  };
  
  export default AuthLayout;