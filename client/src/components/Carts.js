import React, { useState } from "react";

function Carts() {
  const [cartItems, setCartItems] = useState(null);
  return (
    <section className="bg-gray-100 mt-8 py-8 h-[80vh]">
      <div>
        <div className="h-[40vh] px-4">
          {cartItems ? (
            <table className="w-full">
              <tr>
                <th colSpan="3">Product`</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>total</th>
              </tr>
              <tr className="bg-white w-full ">
                <td colSpan="3">Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td>Germany</td>
              </tr>
            </table>
          ) : (
            <section>
              <table className="w-full">
                <tr>
                  <th colSpan="3">Product`</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>total</th>
                </tr>
              </table>
              <div className="bg-white h-[20vh] flex justify-center items-center mt-4">
                <p>There is no Products</p>
              </div>
            </section>
          )}
        </div>

        <div className="">
          <div className="flex px-4">
            <div className="leftbox w-1/3 ">
              <p className="border border-gray-300 p-1">SubTotal</p>
              <p className="border border-gray-300 p-1">VAT Tax</p>
              <p className="border border-gray-300 p-1">Discount</p>
              <p className="border border-gray-300 p-1">Total</p>
            </div>
            <div className="rightbox w-2/3   bg-white">
              <div className="flex justify-between border border-gray-300 p-1">
                <p>0.000(EUR)</p>
                <p>0 items</p>
              </div>
              <div className="flex justify-between border border-gray-300 p-1">
                <p>N/A</p>
                <p>EUR</p>
              </div>
              <div className="flex justify-between border border-gray-300 p-1">
                <p>N/A</p>
                <p>EUR</p>
              </div>
              <div className="flex justify-between border border-gray-300 p-1">
                <p className="text-green-500">0.000(EUR)</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex gap-4 px-4">
            <div className="bg-red-600 h-10 flex justify-center items-center w-full text-white uppercase cursor-pointer">
              <span>Cancel Sale</span>
            </div>
            <div className="bg-green-600 h-10 flex justify-center items-center w-full text-white uppercase cursor-pointer">
              <span>Process Sale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carts;
