export default function AccountSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Account Settings</h1>

      {/* Profile Settings */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">👤 Profile Settings</h2>
        <form className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Full Name" />
          <input className="w-full p-2 border rounded" placeholder="Email Address" disabled />
          <input className="w-full p-2 border rounded" placeholder="Phone Number" />
          <input className="w-full p-2 border rounded" placeholder="Business Name" />
          <input type="file" className="w-full" />
        </form>
      </section>

      {/* Social Integrations */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">📱 Social Integrations</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Connect Instagram</button>
        <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">Connect Facebook</button>
      </section>

      {/* Default Links */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">🔗 Default Links</h2>
        <form className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Default Listing Link" />
          <input className="w-full p-2 border rounded" placeholder="Website / Bio Link" />
        </form>
      </section>

      {/* Auto-Reply & DM Settings */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">🧠 Auto-Reply & DM Settings</h2>
        <form className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Auto-DM Enabled
          </label>
          <textarea className="w-full p-2 border rounded" placeholder="Default DM Message" rows={3} />
          <input className="w-full p-2 border rounded" placeholder="Trigger Keyword (optional)" />
          <select className="w-full p-2 border rounded">
            <option>Send Immediately</option>
            <option>Delay 5s</option>
            <option>Delay 10s</option>
            <option>Delay 30s</option>
          </select>
        </form>
      </section>

      {/* Lead Capture Settings */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">📊 Lead Capture Settings</h2>
        <form className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Capture Name from Comment
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Ask for Email in DM
          </label>
          <input className="w-full p-2 border rounded" placeholder="Custom Email Prompt" />
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Send to CRM (coming soon)
          </label>
        </form>
      </section>

      {/* Security */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">🔐 Security</h2>
        <form className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Change Password" type="password" />
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Enable Two-Factor Auth (coming soon)
          </label>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout of All Devices</button>
        </form>
      </section>

      {/* Billing & Plan */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">💼 Billing & Plan</h2>
        <p>Current Plan: Starter</p>
        <p>Next Payment: July 15, 2025</p>
        <div className="space-x-4 mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Upgrade Plan</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Cancel Plan</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Download Invoices</button>
        </div>
      </section>
    </div>
  );
}
