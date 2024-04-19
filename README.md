<h2># Introduction</h2>

<p>The purpose of creating this middleware app or API gateway is to streamline data from multiple API services. 
In the <b>chem-handler-api-v2</b>, the services included are:</p>

<ul>
<li>Self-hosted service (main backend)</li>
<li>PubChem API</li>
</ul>

<p>
With this setup, the frontend application will be able to connect </br>
to a single source to retrieve the required data.
</p>

<h2># Self-hosted service (main backend)</h2>
<p>Currently, the self-hosted service is not connected to a real backend. Instead, it is connected to a mock API that returns a response object of a Compound, structured as follows:</p>
<blockquote>
class Compound{
  pk: number;
  trivial_name: string;
  cas_number: string;
  inci_name: string;
  smiles: string;
  comedogenicity_class: number;
}
</blockquote>
<h3>## Usage:</h3>
<blockquote>

### Get response list of all compounds

GET https://chem-handler-api-v2.vercel.app/compounds

### Get Response one of compounds registered in mock API json

GET https://chem-handler-api-v2.vercel.app/compounds/:id

Example:
GET https://chem-handler-api-v2.vercel.app/compounds/150

</blockquote>

<h2># PubChem Service (3rd Party Service)</h2>
<p>This service primarily returns responses obtained from the request body to the PubChem database. It utilizes an interceptor to transform the original records into a more useful format.</p>

<h3>## Usage:</h3>
<h4>### Search by CID:</h4>
<blockquote>
### Get by CID full records
POST https://chem-handler-api-v2.vercel.app/pubchem/cid
Content-Type: application/json

{
"id": 12,
"operationType": "fullRecords"
}

### Get response by CID filtered by property

POST https://chem-handler-api-v2.vercel.app/pubchem/cid
Content-Type: application/json

{
"id": 1,
"operationType": "property",
"propertyName": "MolecularWeight"
}

### Get response by CID filtered by multiple properties

POST https://chem-handler-api-v2.vercel.app/pubchem/cid
Content-Type: application/json

{
"id": 1,
"operationType": "property",
"propertyName": "MolecularWeight,MolecularFormula,HBondDonorCount"
}

### Get response by CID filtered only synonyms

POST https://chem-handler-api-v2.vercel.app/pubchem/cid
Content-Type: application/json

{
"id": 1,
"operationType": "synonyms"
}

### Get response by CID filtered only PNG

GET https://chem-handler-api-v2.vercel.app/pubchem/cid/3/image

</blockquote>

<h4>### Search by Name:</h4>
<blockquote>
### Get by name full records
POST https://chem-handler-api-v2.vercel.app/pubchem/name
Content-Type: application/json

{
"name": "glucose",
"operationType": "fullRecords"
}

### Get response by name filtered by property

POST https://chem-handler-api-v2.vercel.app/pubchem/name
Content-Type: application/json

{
"name": "glucose",
"operationType": "property",
"propertyName": "MolecularWeight"
}

### Get response by name filtered by multiple properties

POST https://chem-handler-api-v2.vercel.app/pubchem/name
Content-Type: application/json

{
"name": "glucose",
"operationType": "property",
"propertyName": "MolecularWeight,MolecularFormula,HBondDonorCount"
}

### Get response by name filtered only synonyms

POST https://chem-handler-api-v2.vercel.app/pubchem/name
Content-Type: application/json

{
"name": "glucose",
"operationType": "synonyms"
}

### Get response by name filtered only PNG

GET https://chem-handler-api-v2.vercel.app/pubchem/name/glucose/image

</blockquote>

<h4>### Search by Smiles:</h4>
<blockquote>
### Get by name full records
POST https://chem-handler-api-v2.vercel.app/pubchem/smiles
Content-Type: application/json

{
"smiles": "CCCC",
"operationType": "fullRecords"
}

### Get response by name filtered by property

POST https://chem-handler-api-v2.vercel.app/pubchem/smiles
Content-Type: application/json

{
"smiles": "CCCC",
"operationType": "property",
"propertyName": "MolecularWeight"
}

### Get response by name filtered by multiple properties

POST https://chem-handler-api-v2.vercel.app/pubchem/smiles
Content-Type: application/json

{
"smiles": "CCCC",
"operationType": "property",
"propertyName": "MolecularWeight,MolecularFormula,HBondDonorCount"
}

### Get response by name filtered only synonyms

POST https://chem-handler-api-v2.vercel.app/pubchem/smiles
Content-Type: application/json

{
"smiles": "CCCC",
"operationType": "synonyms"
}

### Get response by name filtered only PNG

GET https://chem-handler-api-v2.vercel.app/pubchem/smiles/CCCC/image

</blockquote>

<blockquote>
You can locate the folder at: <b>src/pubchem/interceptors/pubchem-response.interceptor.ts</b> <br>
This file is primarily responsible for transforming the original records obtained from PubChem.</blockquote>
