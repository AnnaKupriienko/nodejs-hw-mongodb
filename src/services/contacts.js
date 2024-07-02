import { contactsCollection } from "../db/models/contactModel.js"
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ filter,page, perPage,sortBy ="name", sortOrder ="asc" }) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const contactsQuery = contactsCollection.find();
  if(filter.contactType){
    contactsQuery.where("contactType").equals(filter.contactType);
  };
  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  };
  const contacts = await contactsQuery.find().skip(skip).limit(limit).sort({[sortBy]: sortOrder});
  const totalItems = await contactsCollection.countDocuments(contactsQuery.getFilter());
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
