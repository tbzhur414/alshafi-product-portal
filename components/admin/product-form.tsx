"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/data/products"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFormStatus } from "react-dom"

interface ProductFormProps {
  action: (formData: FormData) => Promise<any>
  initialData?: Product
}

export function ProductForm({ action, initialData }: ProductFormProps) {
  const router = useRouter()
  const [transhipmentRates, setTranshipmentRates] = useState(
    initialData?.transhipmentRates || [
      { region: "Punjab", rate: "" },
      { region: "Sindh", rate: "" },
      { region: "KPK", rate: "" },
      { region: "Balochistan", rate: "" },
    ],
  )
  const [regionWiseRates, setRegionWiseRates] = useState(
    initialData?.regionWiseRates || [
      { region: "Lahore", rate: "" },
      { region: "Karachi", rate: "" },
      { region: "Islamabad", rate: "" },
      { region: "Faisalabad", rate: "" },
    ],
  )
  const [policies, setPolicies] = useState(initialData?.policies || [""])

  const handleSubmit = async (formData: FormData) => {
    formData.append("transhipmentRates", JSON.stringify(transhipmentRates))
    formData.append("regionWiseRates", JSON.stringify(regionWiseRates))
    formData.append("policies", JSON.stringify(policies))

    if (initialData?.id) {
      formData.append("id", initialData.id)
    }

    const result = await action(formData)
    if (result.success) {
      alert(result.message)
      router.push("/admin")
    } else {
      alert("Error: " + result.message)
    }
  }

  const handleTranshipmentRateChange = (index: number, field: string, value: string) => {
    const newRates = [...transhipmentRates]
    newRates[index] = { ...newRates[index], [field]: value }
    setTranshipmentRates(newRates)
  }

  const handleRegionWiseRateChange = (index: number, field: string, value: string) => {
    const newRates = [...regionWiseRates]
    newRates[index] = { ...newRates[index], [field]: value }
    setRegionWiseRates(newRates)
  }

  const handlePolicyChange = (index: number, value: string) => {
    const newPolicies = [...policies]
    newPolicies[index] = value
    setPolicies(newPolicies)
  }

  const addPolicy = () => setPolicies([...policies, ""])
  const removePolicy = (index: number) => setPolicies(policies.filter((_, i) => i !== index))

  return (
    <form action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" name="name" defaultValue={initialData?.name} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" defaultValue={initialData?.category} required />
      </div>
      <div>
        <Label htmlFor="image">Image URL (e.g., /placeholder.svg)</Label>
        <Input id="image" name="image" defaultValue={initialData?.image} />
      </div>
      <div>
        <Label htmlFor="rate">Base Rate (Rs.)</Label>
        <Input id="rate" name="rate" defaultValue={initialData?.rate} required />
      </div>
      <div>
        <Label htmlFor="unit">Unit (e.g., per bag (50kg))</Label>
        <Input id="unit" name="unit" defaultValue={initialData?.unit} required />
      </div>

      <h3 className="text-lg font-semibold mt-6">Transhipment Policy Rates</h3>
      <div className="grid grid-cols-2 gap-4">
        {transhipmentRates.map((rate, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`transhipment-region-${index}`}>Region</Label>
            <Input
              id={`transhipment-region-${index}`}
              value={rate.region}
              onChange={(e) => handleTranshipmentRateChange(index, "region", e.target.value)}
              required
            />
            <Label htmlFor={`transhipment-rate-${index}`}>Rate (Rs.)</Label>
            <Input
              id={`transhipment-rate-${index}`}
              value={rate.rate}
              onChange={(e) => handleTranshipmentRateChange(index, "rate", e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6">Region Wise Rates</h3>
      <div className="grid grid-cols-2 gap-4">
        {regionWiseRates.map((rate, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`regionwise-region-${index}`}>Region</Label>
            <Input
              id={`regionwise-region-${index}`}
              value={rate.region}
              onChange={(e) => handleRegionWiseRateChange(index, "region", e.target.value)}
              required
            />
            <Label htmlFor={`regionwise-rate-${index}`}>Rate (Rs.)</Label>
            <Input
              id={`regionwise-rate-${index}`}
              value={rate.rate}
              onChange={(e) => handleRegionWiseRateChange(index, "rate", e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6">Product Policies</h3>
      <div className="space-y-2">
        {policies.map((policy, index) => (
          <div key={index} className="flex items-center gap-2">
            <Textarea
              value={policy}
              onChange={(e) => handlePolicyChange(index, e.target.value)}
              placeholder="Enter policy detail"
              rows={2}
              className="flex-grow"
              required
            />
            {policies.length > 1 && (
              <Button type="button" variant="outline" size="sm" onClick={() => removePolicy(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addPolicy}>
          Add Policy
        </Button>
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Product"}
    </Button>
  )
}
