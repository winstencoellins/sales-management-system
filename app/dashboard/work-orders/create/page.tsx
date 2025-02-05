'use client'

import { Form } from "@heroui/form"
import { Input } from "@heroui/input"

export default function CreateWorkOrder() {
    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Work Order</h1>
                </div>

            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Form validationBehavior="native">
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="0001"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="0001"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="0001"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="0001"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="0001"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                </Form>
            </div>
        </>
    )
}