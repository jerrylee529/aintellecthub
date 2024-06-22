import { NewVerificationForm } from "@/components/forms/new-verification-form"

export default function NewVerificationPage() {
    return (
        <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
          <NewVerificationForm></NewVerificationForm>
        </div>
    )
}