import React, { useRef, useState } from 'react'
export function ChangePasswordCompoent(props) {

    const oldPassword = useRef()
    const confirmPassword = useRef()
    const newPassword = useRef()
    const [isvalidPassword, setIsvalidPassword] = useState({
        isValidNewPassword: null,
        isConfirmPassword: null,
    })
    function onChangePassword() {
        let isvalidPassword = {
            isValidNewPassword: null,
            isConfirmPassword: null,
        }

        const confirmPasswordHTML = document.getElementById("confirmPassword")
        const newPasswordHTML = document.getElementById("newPassword")
        const oldPasswordHTML = document.getElementById("oldPassword")


        if (checkValidPassword(oldPassword.current.value)) {

            isvalidPassword.isValidNewPassword = true

            oldPassword.current.classList.add("is-valid")
            oldPassword.current.classList.remove("is-invalid")
        }
        else {
            isvalidPassword.isValidNewPassword = false

            oldPassword.current.classList.add("is-invalid")
            oldPassword.current.classList.remove("is-valid")
        }
        if (checkValidPassword(newPassword.current.value)) {

            isvalidPassword.isValidNewPassword = true
            newPassword.current.classList.add("is-valid")
            newPassword.current.classList.remove("is-invalid")
        }
        else {
            isvalidPassword.isValidNewPassword = false
            newPassword.current.classList.add("is-invalid")
            newPassword.current.classList.remove("is-valid")
        }


        if (confirmPassword.current.value === newPassword.current.value && confirmPassword.current.value !== "") {
            isvalidPassword.isConfirmPassword = true
            confirmPassword.current.classList.add("is-valid")
            confirmPassword.current.classList.remove("is-invalid")
        }
        else {
            isvalidPassword.isConfirmPassword = false
            confirmPassword.current.classList.add("is-invalid")
            confirmPassword.current.classList.remove("is-valid")
        }

        setIsvalidPassword(isvalidPassword)
    }

    function checkValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    }
    function changePassword() {
        alert(isvalidPassword.isConfirmPassword && isvalidPassword.isValidNewPassword)
        if (isvalidPassword.isConfirmPassword && isvalidPassword.isValidNewPassword) {
            alert(newPassword.current.value)
            let dataPassword = {
                oldPassword: oldPassword.current.value,
                newPassword: newPassword.current.value
            }
            props.saveChangePassword(dataPassword)
        }
    }
    return (
        <div>
            <div className="modal-backdrop fade show"></div>
            <div
                style={{ display: "block" }}
                class="modal show">

                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ">Change passsword</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => props.closeChangePasswordModal()} aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="form-signin needs-validation" id="form-valid-change-password">
                                <div class="form-group form-group-profile-client">
                                    <label for="">Password</label>
                                    <input type="text" ref={oldPassword} onChange={onChangePassword}
                                        class="form-control form-control-sm" required name="" id="oldPassword" aria-describedby="helpId" placeholder="" />
                                    <div class="invalid-feedback">
                                        Please enter current password.
                                    </div>
                                </div>
                                <div class="form-group form-group-profile-client">
                                    <label for="">New Password</label>
                                    <input type="text" ref={newPassword} onChange={onChangePassword}
                                        class="form-control form-control-sm" required name="" id="newPassword" aria-describedby="helpId" placeholder="" />
                                    <div class="invalid-feedback">
                                        Please enter new password.
                                    </div>
                                </div>
                                <div class="form-group form-group-profile-client">
                                    <label for="">Confirm Password</label>
                                    <input type="text" ref={confirmPassword} onChange={onChangePassword}
                                        class="form-control form-control-sm" required name="" id="confirmPassword" aria-describedby="helpId" placeholder="" />
                                    <div class="invalid-feedback">
                                        Password not a match.
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={() => props.closeChangePasswordModal()} data-bs-dismiss="modal">Close</button>
                            <button type="button" id="btnSubmitChangePassword" onClick={() => changePassword()} class="btn btn-primary">Save changes</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export function ChangePasswordAccountManagerCompoent(props) {

    const confirmPassword = useRef()
    const newPassword = useRef()
    const [isvalidPassword, setIsvalidPassword] = useState({
        isValidNewPassword: null,
        isConfirmPassword: null,
    })
    function onChangePassword() {
        let isvalidPassword = {
            isValidNewPassword: null,
            isConfirmPassword: null,
        }





        if (checkValidPassword(newPassword.current.value)) {

            isvalidPassword.isValidNewPassword = true
            newPassword.current.classList.add("is-valid")
            newPassword.current.classList.remove("is-invalid")
        }
        else {
            isvalidPassword.isValidNewPassword = false
            newPassword.current.classList.add("is-invalid")
            newPassword.current.classList.remove("is-valid")
        }


        if (confirmPassword.current.value === newPassword.current.value && confirmPassword.current.value !== "") {
            isvalidPassword.isConfirmPassword = true
            confirmPassword.current.classList.add("is-valid")
            confirmPassword.current.classList.remove("is-invalid")
        }
        else {
            isvalidPassword.isConfirmPassword = false
            confirmPassword.current.classList.add("is-invalid")
            confirmPassword.current.classList.remove("is-valid")
        }

        setIsvalidPassword(isvalidPassword)
    }

    function checkValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    }
    function changePassword() {
        alert(isvalidPassword.isConfirmPassword && isvalidPassword.isValidNewPassword)
        if (isvalidPassword.isConfirmPassword && isvalidPassword.isValidNewPassword) {
            alert(newPassword.current.value)
            let dataPassword = {
                newPassword: newPassword.current.value
            }
            props.saveChangePassword(dataPassword)
        }
    }
    return (
        <div>
            <div className="modal-backdrop fade show"></div>
            <div
                style={{ display: "block" }}
                class="modal show">

                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ">Change passsword</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => props.closeChangePasswordModal()} aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="form-signin needs-validation" id="form-valid-change-password">
                                <div class="form-group form-group-profile-client">
                                    <label for="">New Password</label>
                                    <input type="text" ref={newPassword} onChange={onChangePassword}
                                        class="form-control form-control-sm" required name="" id="newPassword" aria-describedby="helpId" placeholder="" />
                                    <div class="invalid-feedback">
                                        Please enter new password.
                                    </div>
                                </div>
                                <div class="form-group form-group-profile-client">
                                    <label for="">Confirm Password</label>
                                    <input type="text" ref={confirmPassword} onChange={onChangePassword}
                                        class="form-control form-control-sm" required name="" id="confirmPassword" aria-describedby="helpId" placeholder="" />
                                    <div class="invalid-feedback">
                                       Confirm password not match.
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={() => props.closeChangePasswordModal()} data-bs-dismiss="modal">Close</button>
                            <button type="button" id="btnSubmitChangePassword" onClick={() => changePassword()} class="btn btn-primary">Save changes</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}