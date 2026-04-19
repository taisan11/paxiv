type CheckboxOption = {
    inputName: "ai_block" | "author_group" | "series_group"
    queryKey: "ai_type" | "csw" | "gs"
}

type SelectOption = {
    inputName: "s_mode" | "type" | "work_lang"
    queryKey: "s_mode" | "type" | "work_lang"
    defaultValue: string
}

const CHECKBOX_OPTIONS: CheckboxOption[] = [
    { inputName: "ai_block", queryKey: "ai_type" },
    { inputName: "author_group", queryKey: "csw" },
    { inputName: "series_group", queryKey: "gs" }
]

function getDefaultSMode(): string {
    return (document.getElementById("s_mode") as HTMLSelectElement | null)?.dataset.defaultMode ?? "s_tag_full"
}

function setCheckboxState(inputName: CheckboxOption["inputName"], checked: boolean): void {
    const input = document.getElementById(inputName) as HTMLInputElement | null
    if (input) {
        input.checked = checked
    }
}

function setSelectState(inputName: SelectOption["inputName"], value: string): void {
    const select = document.getElementById(inputName) as HTMLSelectElement | null
    if (select) {
        select.value = value
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("search-options-toggle")
    const content = document.getElementById("search-options-content")

    if (toggle && content) {
        toggle.addEventListener("click", () => {
            content.classList.toggle("active")
        })
    }

    const urlParams = new URLSearchParams(window.location.search)
    for (const option of CHECKBOX_OPTIONS) {
        setCheckboxState(option.inputName, urlParams.get(option.queryKey) === "1")
    }

    const selectOptions: SelectOption[] = [
        { inputName: "s_mode", queryKey: "s_mode", defaultValue: getDefaultSMode() },
        { inputName: "type", queryKey: "type", defaultValue: "illust_and_ugoira" },
        { inputName: "work_lang", queryKey: "work_lang", defaultValue: "ja" }
    ]

    for (const option of selectOptions) {
        setSelectState(option.inputName, urlParams.get(option.queryKey) ?? option.defaultValue)
    }

    const searchForms = document.querySelectorAll<HTMLFormElement>('form[action*="/search"]')
    for (const form of searchForms) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()

            const formData = new FormData(form)
            const params = new URLSearchParams()

            const q = formData.get("q")
            if (typeof q === "string" && q) {
                params.set("q", q)
            }

            for (const option of CHECKBOX_OPTIONS) {
                if (formData.get(option.inputName)) {
                    params.set(option.queryKey, "1")
                }
            }

            const submitSelectOptions: SelectOption[] = [
                { inputName: "s_mode", queryKey: "s_mode", defaultValue: getDefaultSMode() },
                { inputName: "type", queryKey: "type", defaultValue: "illust_and_ugoira" },
                { inputName: "work_lang", queryKey: "work_lang", defaultValue: "ja" }
            ]

            for (const option of submitSelectOptions) {
                const raw = formData.get(option.inputName)
                if (typeof raw === "string" && raw && raw !== option.defaultValue) {
                    params.set(option.queryKey, raw)
                }
            }

            window.location.href = `${form.action}?${params.toString()}`
        })
    }
})
