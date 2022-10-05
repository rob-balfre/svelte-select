export const prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
    someaction: async ({ request }) => {
        const data = await request.formData();
        const foobar = data.get('foobar');
        return { success: true, foobar };
    },
};