import React, { useState } from "react";

const Registerscreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (password !== cpassword) {
      setError("Passwords do not match");
    } else {
      setLoading(true);
      // Simulating registration request
      setTimeout(() => {
        const user = {
          name,
          email,
          password,
        };
        console.log(user);
        // Simulating successful registration
        setSuccess("User Registered Successfully");
        setError("");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {loading && <p className="text-center">Loading...</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded-md"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            required
          />
          <button
            onClick={handleRegister}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            REGISTER
          </button>
          <div className="text-center">
            <a href="/login" className="text-gray-600 hover:text-gray-800">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerscreen;