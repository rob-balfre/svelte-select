export const prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
    someaction: async ({ request }) => {
        const data = await request.formData();
        const demo = data.get('demo');
        return { success: true, demo };
    },
};