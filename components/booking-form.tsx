"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";

type FormData = {
  fullName: string;
  pronoun: string;
  email: string;
  phone: string;
  howDidYouHear: string;
  howDidYouHearOther: string;
  isOver18: string;
  isFirstTattoo: string;
  healthConditions: string[];
  healthConditionsOther: string;
  placement: string;
  size: string;
  colouristics: string;
  description: string;
};

const healthConditionOptions = [
  "NONE",
  "Heart Condition",
  "Hepatitis",
  "AIDS/HIV",
  "Epilepsy",
  "Diabetes",
  "Prone to Fainting",
  "Hemophilia",
  "Severe Allergies",
  "Pregnant or Breastfeeding",
  "Acne",
];

const howDidYouHearOptions = [
  "Instagram",
  "Internet/Search",
  "Word of mouth",
  "ORIGIN website",
  "Other",
];

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    pronoun: "",
    email: "",
    phone: "",
    howDidYouHear: "",
    howDidYouHearOther: "",
    isOver18: "",
    isFirstTattoo: "",
    healthConditions: [],
    healthConditionsOther: "",
    placement: "",
    size: "",
    colouristics: "",
    description: "",
  });

  const [placementFiles, setPlacementFiles] = useState<File[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const placementInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHealthConditionChange = (condition: string) => {
    setFormData((prev) => {
      const current = prev.healthConditions;
      if (condition === "NONE") {
        return { ...prev, healthConditions: current.includes("NONE") ? [] : ["NONE"] };
      }
      const withoutNone = current.filter((c) => c !== "NONE");
      if (current.includes(condition)) {
        return { ...prev, healthConditions: withoutNone.filter((c) => c !== condition) };
      }
      return { ...prev, healthConditions: [...withoutNone, condition] };
    });
  };

  const handlePlacementFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPlacementFiles(Array.from(e.target.files));
    }
  };

  const handleReferenceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReferenceFiles(Array.from(e.target.files));
    }
  };

  const removePlacementFile = (index: number) => {
    setPlacementFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeReferenceFile = (index: number) => {
    setReferenceFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const form = formRef.current;
    if (form && !form.checkValidity() || !formData.howDidYouHear || formData.healthConditions.length === 0 || placementFiles.length === 0 || referenceFiles.length === 0) {
      const firstError = document.querySelector(".show-validation .text-red-400") as HTMLElement | null;
      // Small delay to let error messages render
      setTimeout(() => {
        const el = document.querySelector(".show-validation .text-red-400") as HTMLElement | null;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setSubmitting(true);

    try {
      // Upload all files to Vercel Blob
      const allFiles = [...placementFiles, ...referenceFiles];
      const imageUrls: string[] = [];

      for (const file of allFiles) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        imageUrls.push(blob.url);
      }

      // Build details object from form data
      const details: Record<string, string> = {
        Pronoun: formData.pronoun,
        "How did you hear": formData.howDidYouHear === "Other"
          ? formData.howDidYouHearOther
          : formData.howDidYouHear,
        "Over 18": formData.isOver18,
        "First tattoo": formData.isFirstTattoo,
        "Health conditions": formData.healthConditions.includes("Other")
          ? [...formData.healthConditions.filter((c) => c !== "Other"), formData.healthConditionsOther].join(", ")
          : formData.healthConditions.join(", "),
        Placement: formData.placement,
        Size: formData.size,
        Colouristics: formData.colouristics,
        Description: formData.description,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          details,
          imageUrls,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to send");
      }

      alert("Booking request sent! I'll be in touch within 5-7 business days.");

      setSubmitted(false);
      // Reset form
      setFormData({
        fullName: "",
        pronoun: "",
        email: "",
        phone: "",
        howDidYouHear: "",
        howDidYouHearOther: "",
        isOver18: "",
        isFirstTattoo: "",
        healthConditions: [],
        healthConditionsOther: "",
        placement: "",
        size: "",
        colouristics: "",
        description: "",
      });
      setPlacementFiles([]);
      setReferenceFiles([]);
    } catch (err) {
      alert(`Something went wrong: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-[#171717] border border-[#333] px-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:bg-[#1c1c1c] transition-all duration-300";
  const labelClasses = "block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4";
  const requiredMark = <span className="text-accent ml-1">*</span>;
  const errorMsg = (show: boolean, msg = "This field is required") =>
    submitted && show ? (
      <p className="mt-2 text-xs text-red-400">{msg}</p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={`space-y-12 ${submitted ? "show-validation" : ""}`}>
      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            Full Name{requiredMark}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errorMsg(!formData.fullName.trim())}
        </div>
        <div>
          <label htmlFor="pronoun" className={labelClasses}>
            Preferred pronoun
          </label>
          <input
            type="text"
            id="pronoun"
            name="pronoun"
            value={formData.pronoun}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email{requiredMark}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errorMsg(
            !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
            !formData.email.trim() ? "This field is required" : "Please enter a valid email"
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone number{requiredMark}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errorMsg(!formData.phone.trim())}
        </div>
      </div>

      {/* How did you hear about me */}
      <div>
        <p className={labelClasses}>How did you hear about me?{requiredMark}</p>
        <div className="space-y-4 mt-2">
          {howDidYouHearOptions.map((option) => (
            <div key={option} className="flex items-center gap-4">
              <label htmlFor={`hear-${option}`} className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    id={`hear-${option}`}
                    name="howDidYouHear"
                    value={option}
                    checked={formData.howDidYouHear === option}
                    onChange={handleInputChange}
                    required
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 border border-[#444] bg-[#171717] flex items-center justify-center transition-all duration-200 peer-checked:border-accent peer-checked:bg-accent">
                    <div className="w-1.5 h-1.5 bg-background opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {option}
                </span>
              </label>
              {option === "Other" && formData.howDidYouHear === "Other" && (
                <input
                  type="text"
                  name="howDidYouHearOther"
                  value={formData.howDidYouHearOther}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                  className="flex-1 bg-[#171717] border border-[#333] px-4 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:bg-[#1c1c1c] transition-all duration-300"
                />
              )}
            </div>
          ))}
        </div>
        {errorMsg(!formData.howDidYouHear, "Please select an option")}
      </div>

      {/* Yes/No Questions */}
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className={labelClasses}>Are you over 18?{requiredMark}</p>
          <div className="flex gap-8 mt-2">
            {["Yes", "No"].map((option) => (
              <div key={option} className="flex items-center gap-3">
                <label htmlFor={`over18-${option}`} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    id={`over18-${option}`}
                    name="isOver18"
                    value={option}
                    checked={formData.isOver18 === option}
                    onChange={handleInputChange}
                    required
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 border border-[#444] bg-[#171717] flex items-center justify-center transition-all duration-200 peer-checked:border-accent peer-checked:bg-accent">
                    <div className="w-1.5 h-1.5 bg-background opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {option}
                </span>
              </label>
              </div>
            ))}
          </div>
          {errorMsg(!formData.isOver18, "Please select an option")}
        </div>
        <div>
          <p className={labelClasses}>Is this your first tattoo?{requiredMark}</p>
          <div className="flex gap-8 mt-2">
            {["Yes", "No"].map((option) => (
              <div key={option} className="flex items-center gap-3">
                <label htmlFor={`firstTattoo-${option}`} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    id={`firstTattoo-${option}`}
                    name="isFirstTattoo"
                    value={option}
                    checked={formData.isFirstTattoo === option}
                    onChange={handleInputChange}
                    required
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 border border-[#444] bg-[#171717] flex items-center justify-center transition-all duration-200 peer-checked:border-accent peer-checked:bg-accent">
                    <div className="w-1.5 h-1.5 bg-background opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {option}
                </span>
              </label>
              </div>
            ))}
          </div>
          {errorMsg(!formData.isFirstTattoo, "Please select an option")}
        </div>
      </div>

      {/* Health Conditions */}
      <div>
        <p className={labelClasses}>Health conditions{requiredMark}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {healthConditionOptions.map((condition) => (
            <label key={condition} htmlFor={`health-${condition}`} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={`health-${condition}`}
                  checked={formData.healthConditions.includes(condition)}
                  onChange={() => handleHealthConditionChange(condition)}
                  className="peer sr-only"
                />
                <div className="w-4 h-4 border border-[#444] bg-[#171717] flex items-center justify-center transition-all duration-200 peer-checked:border-accent peer-checked:bg-accent">
                  <svg
                    className="w-2.5 h-2.5 text-background opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {condition}
              </span>
            </label>
          ))}
          <div className="flex items-center gap-3 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <label htmlFor="health-other" className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="health-other"
                  checked={formData.healthConditions.includes("Other")}
                  onChange={() => handleHealthConditionChange("Other")}
                  className="peer sr-only"
                />
                <div className="w-4 h-4 border border-[#444] bg-[#171717] flex items-center justify-center transition-all duration-200 peer-checked:border-accent peer-checked:bg-accent">
                  <svg
                    className="w-2.5 h-2.5 text-background opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Other:
              </span>
            </label>
            {formData.healthConditions.includes("Other") && (
              <input
                type="text"
                name="healthConditionsOther"
                value={formData.healthConditionsOther}
                onChange={handleInputChange}
                placeholder="Please specify"
                className="flex-1 bg-[#171717] border border-[#333] px-4 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:bg-[#1c1c1c] transition-all duration-300"
              />
            )}
          </div>
        </div>
        {errorMsg(formData.healthConditions.length === 0, "Please select at least one option")}
      </div>

      {/* Tattoo Details */}
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <label htmlFor="placement" className={labelClasses}>
            Placement on body{requiredMark}
          </label>
          <input
            type="text"
            id="placement"
            name="placement"
            required
            placeholder="e.g., Left forearm"
            value={formData.placement}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errorMsg(!formData.placement.trim())}
        </div>
        <div>
          <label htmlFor="size" className={labelClasses}>
            Size in centimetres{requiredMark}
          </label>
          <input
            type="text"
            id="size"
            name="size"
            required
            placeholder="e.g., 15x10 cm"
            value={formData.size}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errorMsg(!formData.size.trim())}
        </div>
      </div>

      {/* Placement Photo Upload */}
      <div>
        <label className={labelClasses}>Placement Photo Upload{requiredMark}</label>
        <p className="text-xs text-muted-foreground/70 mb-4">
          Please upload a picture of the placement on your body you wish to have
          tattooed, circling the approximate size.
        </p>
        <div
          onClick={() => placementInputRef.current?.click()}
          className="border border-dashed border-white/10 hover:border-accent/50 p-8 md:p-10 text-center cursor-pointer transition-colors duration-300 min-h-[120px] flex flex-col items-center justify-center"
        >
          <input
            ref={placementInputRef}
            type="file"
            accept="image/*"
            onChange={handlePlacementFileChange}
            className="hidden"
          />
          <Upload className="w-6 h-6 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-xs text-muted-foreground/70 uppercase tracking-widest">
            Click to upload
          </p>
        </div>
        {placementFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {placementFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-white/5 py-3 text-sm"
              >
                <span className="text-muted-foreground truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removePlacementFile(index)}
                  className="text-muted-foreground/50 hover:text-accent transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        {errorMsg(placementFiles.length === 0, "Please upload a placement photo")}
      </div>

      {/* Colouristics */}
      <div>
        <label htmlFor="colouristics" className={labelClasses}>
          Colouristics{requiredMark}
        </label>
        <select
          id="colouristics"
          name="colouristics"
          required
          value={formData.colouristics}
          onChange={handleInputChange}
          className="w-full bg-[#171717] border border-[#333] px-4 py-4 text-foreground focus:outline-none focus:border-accent focus:bg-[#1c1c1c] transition-all duration-300 cursor-pointer"
        >
          <option value="" className="bg-[#171717] text-muted-foreground">Select an option</option>
          <option value="Black/Grey" className="bg-[#171717] text-foreground">Black/Grey</option>
          <option value="Colour" className="bg-[#171717] text-foreground">Colour</option>
        </select>
        {errorMsg(!formData.colouristics, "Please select an option")}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClasses}>
          Brief description of your tattoo{requiredMark}
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          value={formData.description}
          onChange={handleInputChange}
          className="w-full bg-[#171717] border border-[#333] px-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:bg-[#1c1c1c] transition-all duration-300 resize-none"
        />
        {errorMsg(!formData.description.trim())}
      </div>

      {/* Reference Photos Upload */}
      <div>
        <label className={labelClasses}>Reference Photos Upload{requiredMark}</label>
        <p className="text-xs text-muted-foreground/70 mb-4">
          Please upload 2-4 photos to reference your idea.
        </p>
        <div
          onClick={() => referenceInputRef.current?.click()}
          className="border border-dashed border-white/10 hover:border-accent/50 p-8 md:p-10 text-center cursor-pointer transition-colors duration-300 min-h-[120px] flex flex-col items-center justify-center"
        >
          <input
            ref={referenceInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleReferenceFileChange}
            className="hidden"
          />
          <Upload className="w-6 h-6 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-xs text-muted-foreground/70 uppercase tracking-widest">
            Click to upload
          </p>
        </div>
        {referenceFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {referenceFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-white/5 py-3 text-sm"
              >
                <span className="text-muted-foreground truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeReferenceFile(index)}
                  className="text-muted-foreground/50 hover:text-accent transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        {errorMsg(referenceFiles.length === 0, "Please upload at least one reference photo")}
      </div>
      <p className="text-xs text-muted-foreground/60 text-center tracking-wide">
        {"Please don't forget to check your spam folder in case my response ended up there."}
      </p>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/80 py-6 text-xs uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending…
          </>
        ) : (
          "Submit Booking Request"
        )}
      </Button>
    </form>
  );
}
