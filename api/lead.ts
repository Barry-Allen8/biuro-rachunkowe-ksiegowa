export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { name, company, email, phone, gdprConsent, honeypot } = request.body;

        // 1. Anti-spam: Honeypot check
        if (honeypot) {
            // Silently fail or return success to fool bot, 
            // but instructions say "reject". 
            // Let's reject to be explicit as requested "reject if missing required fields" etc.
            return response.status(400).json({ success: false, message: 'Spam detected' });
        }

        // 2. Validation
        const errors = [];
        if (!name || name.trim().length < 2) errors.push('Name is required');
        if (!company) errors.push('Company is required'); // Prompt said "Validate body: name, company..." implying required
        if (!email && !phone) errors.push('Email or Phone is required');
        if (gdprConsent !== true) errors.push('GDPR consent is required');

        if (errors.length > 0) {
            return response.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // 3. Simulate real backend delay (600-1200ms)
        const delay = Math.floor(Math.random() * 600) + 600;
        await new Promise(resolve => setTimeout(resolve, delay));

        // 4. Simulate random failure (10%)
        const isSuccess = Math.random() > 0.1;

        if (!isSuccess) {
            return response.status(500).json({
                success: false,
                message: 'Simulation: Something went wrong on the server.'
            });
        }

        // Success
        return response.status(200).json({
            success: true,
            message: 'Lead processed successfully'
        });

    } catch (error) {
        console.error('API Error:', error);
        return response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
