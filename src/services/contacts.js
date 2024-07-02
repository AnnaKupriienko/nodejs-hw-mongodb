import { contactsCollection } from "../db/models/contactModel.js"
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page, perPage,sortBy ="name", sortOrder ="asc" }) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const contacts = await contactsCollection.find().skip(skip).limit(limit).sort({[sortBy]: sortOrder});
  const totalItems = await contactsCollection.countDocuments();
  const {totalPages, hasNextPage, hasPreviousPage} = calculatePaginationData({total:totalItems, perPage, page});

  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage
  };
};
export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};
export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};
export const updateContact = async (contactId, payload) => {
  const contact = await contactsCollection.findOneAndUpdate({_id: contactId}, payload, {
    includeResultMetadatas: true,
  });
  return contact;
};
export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({_id: contactId});
  return contact;
}
