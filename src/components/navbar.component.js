import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function navbar() {
  return (
    <div>
      <nav className="flex flex-col w-full px-6 py-4 bg-white shadow sm:flex-row sm:text-left sm:justify-between sm:items-baseline">
        <div className="mb-2 sm:mb-0">
        </div>
        <div className='text-lg font-light hover:text-blue-dark'>
          {/* <a href="/" className="m-2 text-black no-underline duration-300 hover:text-blue-800 hover:font-normal">Products</a> */}
        </div>

        <div className="grid grid-cols-2 gap-1">

          <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                  Admin
                  <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type=""
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Signed In as <span class="text-base font-semibold text-blue-700">AdminName</span>
                        </button>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div class="">
            <div class="flex justify-center items-center">
              <div class="relative">
                <div class="flex items-center justify-center w-12 h-12 mx-2 overflow-hidden rounded-full">
                  <img alt='' src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                </div>
                <div class="absolute bottom-0 right-0 w-4 h-4 mr-1 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default navbar;