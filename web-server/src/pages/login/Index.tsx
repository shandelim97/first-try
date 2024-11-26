import { useEffect, useState } from 'react'
import CoreTextDropdown from '../../components/common/select/CoreTextDropdown'
import useLogin from '../../hooks/login/useLogin'
import apiContacts from '../../rtk-query/api/contact.api'
import TopHeader from './TopHeader'
import CorePrimaryButton from '../../components/common/button/CorePrimaryButton'
import { useCookies } from 'react-cookie'
import { IContact } from '../../../../shared/types/prisma'

export default function LoginPage() {
    // -- Use States
    const [selectedUser, setSelectedUser] = useState<IContact | undefined>(
        undefined
    )

    // -- Use Queries
    const { data: contactsData, error } = apiContacts.useGetAllQuery(
        { id: undefined },
        {
            pollingInterval: 600000
        }
    )
    // -- Hooks
    const loginHook = useLogin()
    const [_cookie, _setCookie, removeCookie] = useCookies(['token'])

    // -- Use Effect
    useEffect(() => {
        removeCookie('token')
    }, [])

    // const {
    //     isError,
    //     isLoading,
    //     fulfilledTimeStamp,
    //     startedTimeStamp,
    //     data,
    //     error,
    //     currentData,
    //     refetch,
    //     originalArgs,
    //     isUninitialized,
    //     isFetching,
    //     isSuccess,
    //     requestId,
    //     endpointName
    // } = useLoginQuery(false ? skipToken : args, {})

    return (
        <div className="min-w-screen h-full min-h-screen w-full ">
            <div className="absolute inset-0 z-[1] h-[222px] min-h-[222px] w-full bg-primary-background" />
            <div className="z-0 flex h-full min-h-screen w-full flex-col justify-start  bg-secondary-background ">
                <div className="z-[2] flex h-[95px] w-full justify-center">
                    <TopHeader />
                </div>

                <div className="z-[2] flex h-full  w-full items-center justify-center">
                    <div className="mb-[95px] flex  h-[760px] min-h-[760px] w-[1000px]  bg-white lg:rounded">
                        <div className=" flex h-full min-h-full w-[40%] flex-col items-center border-r-[1px] border-r-primary-border-color ">
                            <div className="mt-60">
                                <CoreTextDropdown
                                    idKey="id"
                                    className={`w-60 max-w-60`}
                                    onClick={(selectedOption) =>
                                        setSelectedUser(selectedOption)
                                    }
                                    options={contactsData ? contactsData : []}
                                    displayKey={'username'}
                                />
                            </div>
                            <div className="mt-6">
                                <CorePrimaryButton
                                    buttonText="Login"
                                    onClick={() =>
                                        loginHook.onClick(selectedUser)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
