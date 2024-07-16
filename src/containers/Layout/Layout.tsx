import React, {PropsWithChildren} from 'react';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <div className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid container">
            <p className='navbar-brand'>Todo</p>
          </div>
        </div>
      </header>
      <main className='container flex-grow-1'>
        {children}
      </main>
      <footer className='bg-success'>
        <div className="container text-center">
          <p className='my-4 text-light'>Made by Denis Khrunev student Attractor school 2024</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;