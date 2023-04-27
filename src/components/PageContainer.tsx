import { Outlet } from 'react-router-dom';

function PageContainer() {
  return (
    <main className="container min-h-screen w-full flex flex-col gap-4 h-full py-4 transition-all ease-in">
      {/* <Navbar /> */}
      <section className="pt-32 flex-grow">
        <Outlet />
      </section>
      {/*<Footer />*/}
    </main>
  );
}

export default PageContainer;
