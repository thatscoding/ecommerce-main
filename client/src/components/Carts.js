import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useCart } from "../CartContext";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";

function Carts() {
  const { cart, removeFromCart, updateCartItem, clearCart } = useCart();
  // const [cartItem, setCartItem] = useState(
  //   JSON.parse(localStorage.getItem("cart"))
  // );

  const [open, setOpen] = useState(false);
  const [isopen, setIsOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  // console.log(cart.items.length);
  const cartItem = cart.items.length || null;
  let subtotal = 0.0;
  const calculateSubtotal = () => {
    subtotal = cart.items.reduce((total, item) => total + item.total, 0) || 0.0;
    console.log(subtotal);
  };
  calculateSubtotal();

  const AddQty = async (product) => {
    console.log(product);
    const itmIndex = cart.items.findIndex((item) => item._id === product._id);

    const updatedCart = [...cart.items];
    updatedCart[itmIndex].quantity += 1;
    updatedCart[itmIndex].total =
      updatedCart[itmIndex].quantity * updatedCart[itmIndex].price;

    await updateCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(cart.items));
  };

  const RemoveQty = async (product) => {
    console.log(product);
    const itmIndex = cart.items.findIndex((item) => item._id === product._id);

    const updatedCart = [...cart.items];
    updatedCart[itmIndex].quantity -= 1;
    updatedCart[itmIndex].total =
      updatedCart[itmIndex].quantity * updatedCart[itmIndex].price;
    if (updatedCart[itmIndex].quantity === 0) {
      console.log("working");
      removeFromCart(product._id);
    }
    await updateCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(cart.items));
  };

  return (
    <section className="bg-gray-100 mt-8 py-8 h-[80vh]">
      <div>
        <div className="h-[40vh] px-4 overflow-auto">
          {cartItem ? (
            <table className="w-full">
              <tr>
                <th colSpan="3">Product`</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>total</th>
              </tr>

              {cart.items?.map((item) => (
                <tr className="bg-white w-full ">
                  <td colSpan="3">{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="flex gap-x-1 items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => RemoveQty(item)}
                      >
                        <AiFillMinusSquare
                          className="text-gray-400"
                          size={25}
                        />
                      </span>
                      <span>{item.quantity}</span>
                      <span
                        onClick={() => AddQty(item)}
                        className="cursor-pointer"
                      >
                        <AiFillPlusSquare className="text-gray-400" size={25} />
                      </span>
                    </div>
                  </td>
                  <td>{item.total}</td>
                </tr>
              ))}
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
                <p>{subtotal}(EUR)</p>
                <p>{cart.items.length} items</p>
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
                <p className="text-green-500">{subtotal} (EUR)</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex gap-4 px-4">
            <div
              onClick={() => setOpen(true)}
              className="bg-red-600 h-10 flex justify-center items-center w-full text-white uppercase cursor-pointer"
            >
              <span>Cancel Sale</span>
            </div>
            <div className="bg-green-600 h-10 flex justify-center items-center w-full text-white uppercase cursor-pointer">
              <span>Process Sale</span>
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Are you Sure?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to remove your Cart?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        clearCart();
                        setIsOpen(true);
                      }}
                    >
                      Yes, Sure
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={isopen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex flex-col justify-center items-center">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <IoCheckmarkCircle
                          className="h-20 w-20 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center  sm:mt-4">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Erased
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Removed Successfully
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-center w20 sm:px-6">
                    <button
                      type="button"
                      className=" w-1/2 justify-center  rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 "
                      onClick={() => {
                        setIsOpen(false);
                        clearCart();
                      }}
                    >
                      Okay
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
}

export default Carts;
