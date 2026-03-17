import React from "react";

function StatCard({title,value}){

return(

<div className="bg-white shadow p-6 rounded-lg">

<h3 className="text-gray-500">
{title}
</h3>

<h2 className="text-3xl font-bold">
{value}
</h2>

</div>

)

}

export default StatCard