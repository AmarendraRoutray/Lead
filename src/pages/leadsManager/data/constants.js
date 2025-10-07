export const statusOptions = [
    "Select Status",
    "Not Connected",
    "In Progress",
    "SV Scheduled",
    "SV Completed",
    "EOI Completed",
    "Booking Completed",
    "Dead Lead"
];

export const intentOptions = [
    { label: "Select Intent", color: "bg-gray-400" },
    { value: "new-lead", label: "New Lead", color: "bg-blue-500" },
    { value: "hot-lead", label: "Hot Lead", color: "bg-green-500" },
    { value: "cold-lead", label: "Cold Lead", color: "bg-sky-500" },
    { value: "warm-lead", label: "Warm Lead", color: "bg-orange-400" },
];

export const deadReasons = [
    "Signed up by mistake",
    "Wrong number",
    "Budget issue",
    "Location issue",
    "Wrong or Fake Lead",
    "Changed Decision",
    "Others"
];

export const messageTemplates = [
    "Welcome Message",
    "Follow-up Reminder",
    "Site Visit Confirmation",
    "EOI Payment Reminder",
    "Booking Confirmation",
    "Thank You Message"
];