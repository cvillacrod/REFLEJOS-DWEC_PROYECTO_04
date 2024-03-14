import { getDoc } from 'firebase/firestore'
import { get, set } from 'lodash'

const getReference = async documentReference => {
  const res = await getDoc(documentReference)
  const data = res.data()

  if (data && documentReference.id) {
    data.uid = documentReference.id
  }

  return data
}

const hydrate = async (document, paths = []) => Promise.all(
 
  paths.map(async path => {
    const documentReference = get(document, path)

    if (!documentReference || !documentReference.path) {
      return console.warn(
        `Error hydrating documentReference for path "${path}": Not found or invalid reference`
      )
    }

    const result = await getReference(documentReference);
    set(document, path, result)
  })
)

export { hydrate }