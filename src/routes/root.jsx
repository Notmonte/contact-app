import { useEffect } from "react"
import { Outlet, Link, NavLink, useLoaderData, useNavigation, Form, redirect, useSubmit } from "react-router-dom"
import { getContacts, createContact }  from "../contacts"

export async function loader({ request }) {
    const url = new URL(request.url)
    const q = url.searchParams.get("q")
    const contacts = await getContacts();
    return { contacts, q }
}

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
}

const Root =()=> {
    const navigation = useNavigation();
    const { contacts, q } = useLoaderData();
    const submit = useSubmit()

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q")


    const handleChange=(event)=> {
        const isFirstSearch = q == nullsubmit(event.currentTarget.form, {
            replace: !isFirstSearch
        })
    }


useEffect(()=> {
    document.getElementById('q').value = q
}, [q])
    return(
        <>
        <aside id="sidebar">
            <h1>Demonte's Contacts</h1>
            <div>
                <form id="search-form" role="search">
                    <input
                        id="q"
                        className={searching ? "loading" : ''}
                        aria-label="Search contacts"
                        placeholder="Search"
                        type="search"
                        name="q"
                        defaultValue={q}
                        onChange={handleChange}
                    />
                    <div 
                        id="search-spinner"
                        aria-hidden
                        hidden={!searching}
                    />
                    <div className="sr-only" aria-live="polite"></div>
                </form>
                <Form method="POST">
                    <button type="submit">New</button>
                </Form>
            </div>
            <nav>
                {contacts.length ? (
                    <ul>
                        {contacts.map((contact) => (
                            <li key={contact.id}>
                                <NavLink 
                                    to={`contacts/${contact.id}`}
                                    className={( {isActive, isPending})=> 
                                    isActive ? "active" 
                                    : isPending ? 
                                    "pending" : 
                                    ''} 
                                >
                                    {contact.first || contact.last ? (
                                        <>
                                            {contact.first} {contact.last}
                                        </>
                                    ) : (
                                        <i>No Name</i>
                                    )} {" "}
                                    {contact.favorite && <sapan>★</sapan>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>
                        <i>No Contacts</i>
                    </p>
                )}
            </nav>
        </aside>
        <div id="detail" className={ NavigationPreloadManager.state === "loading" ? "loading" : ""}
        >
            <Outlet />
        </div>
        </>
    )
}

export default Root