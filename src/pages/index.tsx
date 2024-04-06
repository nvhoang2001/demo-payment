import PaymentForm from '@/components/template/Homepage';

// Normal asset import => return path
// import reactLogo from '@/assets/react.svg';
// React Query asset import => return react component
// import ReactLogo from '@/assets/react.svg?react';

function Homepage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-300">
      <div className="h-auto w-[900px] rounded-2xl bg-white">
        <PaymentForm />
      </div>
    </div>
  );
}

export default Homepage;
