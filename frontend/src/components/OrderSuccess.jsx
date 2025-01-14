const OrderSuccess = () => {
  return (
    <section className="h-[60vh] flex items-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
              <h1 className="font-bold text-lg">
                Thanh toán của bạn đã thành công và bạn sẽ được chuyển đến trang
                đơn hàng sau 3 giây !
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
